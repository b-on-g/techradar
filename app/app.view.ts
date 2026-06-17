namespace $.$$ {

	type Entry = {
		label: string
		quadrant: number
		ring: number
		link?: string
	}

	type LegendItem =
		| { kind: 'q', text: string }
		| { kind: 'r', text: string }
		| { kind: 'b', text: string, link: string, hasLink: boolean }

	const QUADRANT_NAMES = [
		'Languages & Frameworks',
		'Libraries',
		'Techniques',
		'Tools & Environment',
	]

	const RING_NAMES = [ 'ADOPT', 'TRIAL', 'ASSESS', 'HOLD' ]
	const RING_COLORS = [ '#5ba300', '#009eb0', '#c7ba00', '#e09b96' ]
	const RING_BOUNDS: [ number, number ][] = [
		[ 0, 130 ],
		[ 130, 240 ],
		[ 240, 350 ],
		[ 350, 450 ],
	]
	const QUADRANT_ANGLES: [ number, number ][] = [
		[ -Math.PI / 2, 0 ],
		[ 0, Math.PI / 2 ],
		[ Math.PI / 2, Math.PI ],
		[ Math.PI, 3 * Math.PI / 2 ],
	]
	const QUADRANT_LABEL_POS: [ number, number ][] = [
		[ 350, -460 ],
		[ 350, 480 ],
		[ -350, 480 ],
		[ -350, -460 ],
	]
	const MAX_AXIS = 450

	type Config = {
		date?: string
		title?: string
		entries: Entry[]
	}

	export class $bog_techradar_app extends $.$bog_techradar_app {

		@ $mol_mem
		config(): Config {
			return $mol_fetch.json( 'bog/techradar/config.json' ) as Config
		}

		entries(): readonly Entry[] {
			return this.config().entries
		}

		@ $mol_mem
		blip_positions(): readonly { x: number, y: number }[] {
			const positions: { x: number, y: number }[] = []
			const entries = this.entries()

			const grouped = new Map<string, number[]>()
			entries.forEach( ( e, i ) => {
				const key = `${ e.quadrant }-${ e.ring }`
				const arr = grouped.get( key )
				if ( arr ) arr.push( i )
				else grouped.set( key, [ i ] )
			} )

			for ( let q = 0; q < 4; q++ ) {
				for ( let r = 0; r < 4; r++ ) {
					const key = `${ q }-${ r }`
					const indices = grouped.get( key ) || []
					if ( indices.length === 0 ) continue

					const [ aStart, aEnd ] = QUADRANT_ANGLES[ q ]
					const [ rIn, rOut ] = RING_BOUNDS[ r ]
					const padding = ( aEnd - aStart ) * 0.08
					const rPad = ( rOut - rIn ) * 0.15

					indices.forEach( ( idx, j ) => {
						const t = ( j + 0.5 ) / indices.length
						const angle = aStart + padding + t * ( aEnd - aStart - 2 * padding )
						const radius = ( rIn + rOut ) / 2 + ( ( j % 2 === 0 ? 1 : -1 ) * rPad )
						positions[ idx ] = {
							x: Math.cos( angle ) * radius,
							y: Math.sin( angle ) * radius,
						}
					} )
				}
			}

			return positions
		}

		// Ring(id): outer radius
		ring_radius( id: number ) {
			return String( RING_BOUNDS[ id ][ 1 ] )
		}

		axis_from_x( id: number ) { return id === 0 ? String( -MAX_AXIS ) : '0' }
		axis_from_y( id: number ) { return id === 0 ? '0' : String( -MAX_AXIS ) }
		axis_to_x( id: number ) { return id === 0 ? String( MAX_AXIS ) : '0' }
		axis_to_y( id: number ) { return id === 0 ? '0' : String( MAX_AXIS ) }

		q_label_x( id: number ) { return String( QUADRANT_LABEL_POS[ id ][ 0 ] ) }
		q_label_y( id: number ) { return String( QUADRANT_LABEL_POS[ id ][ 1 ] ) }
		q_label_text( id: number ) { return QUADRANT_NAMES[ id ] }

		r_label_x( id: number ) {
			const [ rIn, rOut ] = RING_BOUNDS[ id ]
			return String( ( rIn + rOut ) / 2 )
		}
		r_label_text( id: number ) { return RING_NAMES[ id ] }

		blip_x( id: number ) { return String( this.blip_positions()[ id ].x ) }
		blip_y( id: number ) { return String( this.blip_positions()[ id ].y ) }
		blip_num_y( id: number ) { return String( this.blip_positions()[ id ].y + 4 ) }
		blip_color( id: number ) { return RING_COLORS[ this.entries()[ id ].ring ] }
		blip_num( id: number ) { return String( id + 1 ) }

		radar_items() {
			const items: readonly any[] = [
				...[ 3, 2, 1, 0 ].map( r => this.Ring( r ) ),
				this.Axis( 0 ),
				this.Axis( 1 ),
				...[ 0, 1, 2, 3 ].map( q => this.Q_label( q ) ),
				...[ 0, 1, 2, 3 ].map( r => this.R_label( r ) ),
				...this.entries().flatMap( ( _, i ) => [ this.Blip_dot( i ), this.Blip_num( i ) ] ),
			]
			return items
		}

		@ $mol_mem
		legend_struct(): readonly LegendItem[] {
			const items: LegendItem[] = []
			for ( let q = 0; q < 4; q++ ) {
				items.push( { kind: 'q', text: QUADRANT_NAMES[ q ] } )
				for ( let r = 0; r < 4; r++ ) {
					const subset = this.entries()
						.map( ( e, i ) => ( { e, i } ) )
						.filter( x => x.e.quadrant === q && x.e.ring === r )
					if ( subset.length === 0 ) continue
					items.push( { kind: 'r', text: RING_NAMES[ r ] } )
					for ( const { e, i } of subset ) {
						items.push( {
							kind: 'b',
							text: `${ i + 1 }. ${ e.label }`,
							link: e.link || '',
							hasLink: Boolean( e.link ),
						} )
					}
				}
			}
			return items
		}

		q_header_text( id: number ) { return this.legend_struct()[ id ].text }
		r_header_text( id: number ) { return this.legend_struct()[ id ].text }
		blip_row_text( id: number ) { return this.legend_struct()[ id ].text }
		blip_row_uri( id: number ) {
			const it = this.legend_struct()[ id ]
			return it.kind === 'b' ? it.link : ''
		}

		legend_items() {
			return this.legend_struct().map( ( item, i ) => {
				if ( item.kind === 'q' ) return this.Q_header( i )
				if ( item.kind === 'r' ) return this.R_header( i )
				if ( item.kind === 'b' && item.hasLink ) return this.Blip_row( i )
				return this.Blip_text( i )
			} )
		}

		blip_pop_text( id: number ) {
			return this.entries()[ id ].label
		}

		blip_pops() {
			return this.entries().map( ( _, i ) => this.Blip_pop( i ) )
		}

		@ $mol_mem_key
		Blip_pop( id: number ) {
			const pop = super.Blip_pop( id )
			const view = pop as unknown as { style: () => Record<string, string> }
			view.style = () => {
				const pos = this.blip_positions()[ id ]
				const leftPct = ( pos.x + 700 ) / 14
				const topPct = ( pos.y + 500 ) / 10
				return {
					position: 'absolute',
					left: `${ leftPct }%`,
					top: `${ topPct }%`,
					width: '24px',
					height: '24px',
					transform: 'translate(-50%, -50%)',
					pointerEvents: 'auto',
				}
			}
			return pop
		}

	}

}
