const getUrl = (domain, path) => `${domain}${path}`;

module.exports = ({ domain }) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Chris Hutchinson</title>

  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" href="${getUrl(domain, 'manifest.json')}">
  
  <meta name="theme-color" content="#2f60ae" />

  <style type="text/css">
    html {
      font-size: 62.5%;
    }

    body {
      margin: 0;
      font-size: 14px;
      font-size: 1.4rem;
      background: #fafafa;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
  </style>
</head>
<body>

<main></main>

<script type="text/javascript">
  window.staticResourceDomain = '${domain}';
</script>
<script type="text/javascript" src="${getUrl(domain, 'app.js')}" defer></script>

</body>
</html>`;
