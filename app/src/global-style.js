import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #d20b56;
    --bg: #231333;
    --bg-2: #1f1c34;
    --text: #ffffff;
  }

  body {
    margin: 0;
    background: linear-gradient(160deg, var(--bg) 70%, var(--primary) 120%) ;
    color: var(--text);
    min-height: 100vh;
    font-family: "Consolas", "Menlo", "Ubuntu Mono", monospace;
  }
`

export default GlobalStyle;