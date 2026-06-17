namespace $.$$ {

	$mol_style_define( $bog_techradar_app, {

		Header: {
			display: 'flex',
			flexDirection: 'column',
			padding: {
				top: $mol_gap.block,
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
		},

		Header_title: {
			display: 'block',
			color: $bog_theme.text,
			font: { size: '28px', weight: 700 },
		},

		Header_date: {
			display: 'block',
			color: $bog_theme.shade,
			font: { size: '13px' },
			padding: { top: '2px' },
		},

		Info: {
			display: 'flex',
			flexDirection: 'column',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
			maxWidth: '900px',
			color: $bog_theme.text,
			font: { size: '13px' },
		},

		Info_intro: {
			display: 'block',
			font: { size: '14px', weight: 700 },
			color: $bog_theme.text,
		},

		Info_adopt: {
			display: 'block',
			padding: { left: $mol_gap.block },
			border: { left: { width: '3px', style: 'solid', color: '#5ba300' } },
		},

		Info_trial: {
			display: 'block',
			padding: { left: $mol_gap.block },
			border: { left: { width: '3px', style: 'solid', color: '#009eb0' } },
		},

		Info_assess: {
			display: 'block',
			padding: { left: $mol_gap.block },
			border: { left: { width: '3px', style: 'solid', color: '#c7ba00' } },
		},

		Info_hold: {
			display: 'block',
			padding: { left: $mol_gap.block },
			border: { left: { width: '3px', style: 'solid', color: '#e09b96' } },
		},

		Info_source: {
			display: 'block',
			padding: { top: $mol_gap.block },
			color: $bog_theme.shade,
			font: { size: '12px' },
		},

		Layout: {
			display: 'grid',
			gridTemplateColumns: '260px 1fr 260px',
			gridTemplateRows: 'auto auto',
			gridTemplateAreas: '"techniques radar tools" "libraries radar languages"',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
			alignItems: 'start',
		},

		Q_block_techniques: {
			display: 'flex',
			flexDirection: 'column',
			gridArea: 'techniques',
		},
		Q_block_tools: {
			display: 'flex',
			flexDirection: 'column',
			gridArea: 'tools',
		},
		Q_block_libraries: {
			display: 'flex',
			flexDirection: 'column',
			gridArea: 'libraries',
		},
		Q_block_languages: {
			display: 'flex',
			flexDirection: 'column',
			gridArea: 'languages',
		},

		Q_block_techniques_title: {
			display: 'block',
			font: { size: '20px', weight: 700 },
			color: $bog_theme.text,
			padding: { bottom: '4px' },
		},
		Q_block_tools_title: {
			display: 'block',
			font: { size: '20px', weight: 700 },
			color: $bog_theme.text,
			padding: { bottom: '4px' },
		},
		Q_block_libraries_title: {
			display: 'block',
			font: { size: '20px', weight: 700 },
			color: $bog_theme.text,
			padding: { bottom: '4px' },
		},
		Q_block_languages_title: {
			display: 'block',
			font: { size: '20px', weight: 700 },
			color: $bog_theme.text,
			padding: { bottom: '4px' },
		},

		Q_block_techniques_list: {
			display: 'flex',
			flexDirection: 'column',
		},
		Q_block_tools_list: {
			display: 'flex',
			flexDirection: 'column',
		},
		Q_block_libraries_list: {
			display: 'flex',
			flexDirection: 'column',
		},
		Q_block_languages_list: {
			display: 'flex',
			flexDirection: 'column',
		},

		Radar_box: {
			gridArea: 'radar',
			position: 'relative',
			width: '100%',
			maxWidth: '900px',
			aspectRatio: '14 / 10',
			alignSelf: 'center',
			justifySelf: 'center',
		},

		Radar: {
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

		R_header: {
			display: 'block',
			font: { size: '13px', weight: 700 },
			color: $bog_theme.shade,
			padding: {
				top: '6px',
			},
			'@': {
				'data-ring': {
					'0': { color: '#5ba300' },
					'1': { color: '#009eb0' },
					'2': { color: '#c7ba00' },
					'3': { color: '#e09b96' },
				},
			},
		},

		Blip_row: {
			display: 'block',
			color: $bog_theme.text,
			textDecoration: 'none',
			font: { size: '12px' },
			lineHeight: '1.5',
			userSelect: 'none',
		},

		Blip_text: {
			display: 'block',
			color: $bog_theme.text,
			font: { size: '12px' },
			lineHeight: '1.5',
			userSelect: 'none',
		},

		Forms_legend: {
			display: 'block',
			textAlign: 'center',
			padding: { top: $mol_gap.text, bottom: $mol_gap.block },
			font: { size: '12px' },
			color: $bog_theme.shade,
		},

	} )

}
