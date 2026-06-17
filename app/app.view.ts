namespace $.$$ {

	type Entry = {
		label: string
		quadrant: number
		ring: number
		moved?: number
		link?: string
	}

	type LegendItem =
		| { kind: 'r', text: string, quadrant: number, ring: number }
		| { kind: 'b', text: string, link: string, hasLink: boolean, blipIdx: number, quadrant: number, ring: number }

	type Config = {
		date?: string
		title?: string
		entries: Entry[]
	}

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
	const MAX_AXIS = 450

	const BLIP_R = 12

	function circle_d( cx: number, cy: number, r: number ) {
		return `M ${ cx + r } ${ cy } A ${ r } ${ r } 0 1 1 ${ cx - r } ${ cy } A ${ r } ${ r } 0 1 1 ${ cx + r } ${ cy } Z`
	}
	function triangle_up_d( cx: number, cy: number, r: number ) {
		const h = r * 1.15
		return `M ${ cx } ${ cy - h } L ${ cx - r } ${ cy + h * 0.65 } L ${ cx + r } ${ cy + h * 0.65 } Z`
	}
	function triangle_down_d( cx: number, cy: number, r: number ) {
		const h = r * 1.15
		return `M ${ cx } ${ cy + h } L ${ cx - r } ${ cy - h * 0.65 } L ${ cx + r } ${ cy - h * 0.65 } Z`
	}
	function star_d( cx: number, cy: number, R: number ) {
		const inner = R * 0.45
		const points: string[] = []
		for ( let i = 0; i < 10; i++ ) {
			const angle = -Math.PI / 2 + i * Math.PI / 5
			const rr = i % 2 === 0 ? R : inner
			points.push( `${ cx + rr * Math.cos( angle ) } ${ cy + rr * Math.sin( angle ) }` )
		}
		return 'M ' + points.join( ' L ' ) + ' Z'
	}

	export class $bog_techradar_app extends $.$bog_techradar_app {

		@ $mol_mem
		config(): Config {
			return $mol_fetch.json( 'bog/techradar/config.json' ) as Config
		}

		entries(): readonly Entry[] {
			return this.config().entries
		}

		header_date_text() {
			return this.config().date || ''
		}

		@ $mol_mem
		hovered_blip( next?: number | null ): number | null {
			return next ?? null
		}

		@ $mol_action
		radar_leave( e?: Event | null ) {
			this.hovered_blip( null )
		}

		@ $mol_action
		blip_pop_click( id: number, e?: Event | null ) {
			const link = this.entries()[ id ].link
			if ( link ) window.open( link, '_blank', 'noopener,noreferrer' )
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

		ring_radius( id: number ) {
			return String( RING_BOUNDS[ id ][ 1 ] )
		}

		axis_from_x( id: number ) { return id === 0 ? String( -MAX_AXIS ) : '0' }
		axis_from_y( id: number ) { return id === 0 ? '0' : String( -MAX_AXIS ) }
		axis_to_x( id: number ) { return id === 0 ? String( MAX_AXIS ) : '0' }
		axis_to_y( id: number ) { return id === 0 ? '0' : String( MAX_AXIS ) }

		r_big_label_y( id: number ) {
			const [ rIn, rOut ] = RING_BOUNDS[ id ]
			return String( -( rIn + rOut ) / 2 )
		}
		r_big_label_text( id: number ) { return RING_NAMES[ id ] }
		r_big_label_color( id: number ) { return RING_COLORS[ id ] }
		r_big_label_opacity( id: number ) {
			return [ '0.25', '0.3', '0.4', '0.55' ][ id ]
		}

		blip_x( id: number ) { return String( this.blip_positions()[ id ].x ) }
		blip_y( id: number ) { return String( this.blip_positions()[ id ].y ) }
		blip_num_y( id: number ) { return String( this.blip_positions()[ id ].y + 4 ) }
		blip_color( id: number ) { return RING_COLORS[ this.entries()[ id ].ring ] }
		blip_num( id: number ) { return String( id + 1 ) }

		blip_shape_d( id: number ) {
			const pos = this.blip_positions()[ id ]
			const moved = this.entries()[ id ].moved ?? 0
			if ( moved === 1 ) return triangle_up_d( pos.x, pos.y, BLIP_R )
			if ( moved === -1 ) return triangle_down_d( pos.x, pos.y, BLIP_R )
			if ( moved === 2 ) return star_d( pos.x, pos.y, BLIP_R )
			return circle_d( pos.x, pos.y, BLIP_R )
		}

		blip_label( id: number ) {
			return this.entries()[ id ].label
		}

		blip_pops() {
			return this.entries().map( ( _, i ) => this.Blip_pop( i ) )
		}

		radar_items() {
			const items: readonly any[] = [
				...[ 3, 2, 1, 0 ].map( r => this.Ring( r ) ),
				this.Axis( 0 ),
				this.Axis( 1 ),
				...[ 0, 1, 2, 3 ].map( r => this.R_big_label( r ) ),
				...this.entries().map( ( _, i ) => this.Blip( i ) ),
			]
			return items
		}

		@ $mol_mem
		legend_struct(): readonly LegendItem[] {
			const items: LegendItem[] = []
			for ( let q = 0; q < 4; q++ ) {
				for ( let r = 0; r < 4; r++ ) {
					const subset = this.entries()
						.map( ( e, i ) => ( { e, i } ) )
						.filter( x => x.e.quadrant === q && x.e.ring === r )
					if ( subset.length === 0 ) continue
					items.push( { kind: 'r', quadrant: q, ring: r, text: RING_NAMES[ r ] } )
					for ( const { e, i } of subset ) {
						items.push( {
							kind: 'b',
							quadrant: q,
							ring: r,
							text: `${ i + 1 }. ${ e.label }`,
							link: e.link || '',
							hasLink: Boolean( e.link ),
							blipIdx: i,
						} )
					}
				}
			}
			return items
		}

		r_header_text( id: number ) {
			const it = this.legend_struct()[ id ]
			return it.kind === 'r' ? it.text : ''
		}
		blip_row_text( id: number ) {
			const it = this.legend_struct()[ id ]
			return it.kind === 'b' ? it.text : ''
		}
		blip_row_uri( id: number ) {
			const it = this.legend_struct()[ id ]
			return it.kind === 'b' ? it.link : ''
		}

		legend_items_for_quadrant( q: number ) {
			return this.legend_struct()
				.map( ( item, i ) => ( { item, i } ) )
				.filter( x => x.item.quadrant === q )
				.map( ( { item, i } ) => {
					if ( item.kind === 'r' ) return this.R_header( i )
					if ( item.kind === 'b' && item.hasLink ) return this.Blip_row( i )
					return this.Blip_text( i )
				} )
		}

		q_block_techniques_items() { return this.legend_items_for_quadrant( 2 ) }
		q_block_tools_items() { return this.legend_items_for_quadrant( 3 ) }
		q_block_libraries_items() { return this.legend_items_for_quadrant( 1 ) }
		q_block_languages_items() { return this.legend_items_for_quadrant( 0 ) }

		@ $mol_mem_key
		R_header( id: number ) {
			const view = super.R_header( id )
			const item = this.legend_struct()[ id ]
			if ( item.kind === 'r' ) {
				view.attr = () => ( { 'data-ring': String( item.ring ) } )
			}
			return view
		}

		row_active_style( id: number ) {
			const item = this.legend_struct()[ id ]
			const active = item.kind === 'b' && this.hovered_blip() === item.blipIdx
			return {
				background: active ? 'var(--mol_theme_hover)' : '',
				fontWeight: active ? '700' : '',
			}
		}

		@ $mol_mem_key
		Blip_row( id: number ) {
			const view = super.Blip_row( id )
			view.style = ( () => this.row_active_style( id ) ) as typeof view.style
			return view
		}

		@ $mol_mem_key
		Blip_text( id: number ) {
			const view = super.Blip_text( id )
			view.style = ( () => this.row_active_style( id ) ) as typeof view.style
			return view
		}

		@ $mol_mem_key
		Blip_pop( id: number ) {
			const pop = super.Blip_pop( id )
			const owner = this
			const view = pop as unknown as {
				style: () => Record<string, string>
				hovered: ( next?: boolean ) => boolean
			}
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
					cursor: 'pointer',
				}
			}
			view.hovered = ( next?: boolean ) => {
				if ( next !== undefined ) {
					owner.hovered_blip( next ? id : null )
					return next
				}
				return owner.hovered_blip() === id
			}
			return pop
		}

	}

}
