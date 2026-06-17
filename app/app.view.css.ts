namespace $.$$ {

	$mol_style_define( $bog_techradar_app, {

		Info: {
			display: 'flex',
			flexDirection: 'column',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
			maxWidth: '900px',
			color: $bog_theme.text,
			font: {
				size: '14px',
			},
		},

		Info_intro: {
			display: 'block',
			font: {
				size: '15px',
				weight: 700,
			},
			color: $bog_theme.text,
		},

		Info_adopt: {
			display: 'block',
			padding: {
				left: $mol_gap.block,
			},
			border: {
				left: {
					width: '3px',
					style: 'solid',
					color: '#5ba300',
				},
			},
		},

		Info_trial: {
			display: 'block',
			padding: {
				left: $mol_gap.block,
			},
			border: {
				left: {
					width: '3px',
					style: 'solid',
					color: '#009eb0',
				},
			},
		},

		Info_assess: {
			display: 'block',
			padding: {
				left: $mol_gap.block,
			},
			border: {
				left: {
					width: '3px',
					style: 'solid',
					color: '#c7ba00',
				},
			},
		},

		Info_hold: {
			display: 'block',
			padding: {
				left: $mol_gap.block,
			},
			border: {
				left: {
					width: '3px',
					style: 'solid',
					color: '#e09b96',
				},
			},
		},

		Info_source: {
			display: 'block',
			padding: {
				top: $mol_gap.block,
			},
			color: $bog_theme.shade,
			font: {
				size: '13px',
			},
		},

		Layout: {
			display: 'flex',
			flexDirection: 'column',
			gap: $mol_gap.block,
			padding: $mol_gap.block,
		},

		Radar_box: {
			position: 'relative',
			width: '100%',
			maxWidth: '1100px',
			aspectRatio: '14 / 10',
		},

		Radar: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},

		Pops: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			pointerEvents: 'none',
		},

		Legend: {
			width: '100%',
			maxWidth: '700px',
		},

		Q_header: {
			display: 'block',
			font: {
				size: '18px',
				weight: 700,
			},
			color: $bog_theme.text,
			padding: {
				top: $mol_gap.block,
				bottom: $mol_gap.space,
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
			border: {
				bottom: {
					width: '1px',
					style: 'solid',
					color: $bog_theme.line,
				},
			},
		},

		R_header: {
			display: 'block',
			font: {
				size: '14px',
				weight: 700,
			},
			color: $bog_theme.shade,
			padding: {
				top: $mol_gap.space,
				bottom: '2px',
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
		},

		Blip_row: {
			display: 'block',
			color: $bog_theme.text,
			padding: {
				top: '2px',
				bottom: '2px',
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
		},

		Blip_text: {
			display: 'block',
			color: $bog_theme.text,
			padding: {
				top: '2px',
				bottom: '2px',
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
		},

	} )

}
