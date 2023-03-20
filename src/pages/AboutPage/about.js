import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

export default function ControlledAccordions() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{ marginLeft: 5 }}>
      <Typography
        style={{ marginBottom: 30, textDecoration: 'bold' }}
        component='h1'
        variant='h6'
        textAlign='center'
      >
        {t('s-ren')}
      </Typography>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {t('s-sel')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('s-sel-1')}
            {t('s-sel-2')}
            {t('s-sel-3')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2bh-content'
          id='panel2bh-header'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {t('s-ren')}{' '}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('s-ren-1')}
            {t('s-ren-2')}
            {t('s-ren-3')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3bh-content'
          id='panel3bh-header'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {t('s-buy')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('s-buy-1')}
            {t('s-buy-2')}
            {t('s-buy-3')}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
