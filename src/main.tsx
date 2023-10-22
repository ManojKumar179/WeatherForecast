import GlobalStyles from '@mui/material/GlobalStyles';

import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyles styles={{
      body: { margin: 0 }
    }}/>
    <App />
  </>
)
