export function FontProvider() {
  return (
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const storedAppSetings = localStorage.getItem('pomodoro-app@appSetings');
              if (storedAppSetings) {
                const savedFont = JSON.parse(storedAppSetings).theme.font;
                document.documentElement.style.setProperty(
                  '--font-base',
                  'var(--font-' + savedFont + ')',
                )
              }
            })();
            `,
        }}
      />
    </head>
  )
}
