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
    background: radial-gradient(circle at 50% -100%, var(--bg) 85%, var(--primary) 120%) ;
    color: var(--text);
    min-height: 100vh;
    font-family: "Consolas", "Menlo", "Ubuntu Mono", monospace;
  }

  a {
    text-decoration: none;
  }
`

export default GlobalStyle;