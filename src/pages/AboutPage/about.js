import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'

export default function ControlledAccordions() {
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
        الخدمات التي نقدمها
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
            بيع العقار
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            لو بدك تبيع عقارات نقدم لك خدمات فحص و تسعير العقار لو بدك قبل عرضه
            على الموقع
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
          <Typography sx={{ width: '33%', flexShrink: 0 }}>الأيجار </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            بدك تأجر عقاراك نقدم خدمات صيانة العقارا ومراجعة العقد واتمام
            الاجراءات القانونية قبل عرضه
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
          <Typography sx={{ width: '33%', flexShrink: 0 }}>شراء</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            بدك تشتري عقار ما تعرف اى منطقة وشو السعر نعرض لك خدمات مراجعة
            العقارات قبل الشراء و تسعير قيمة الأرض و مراجعة الأجراءات القانونية
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
