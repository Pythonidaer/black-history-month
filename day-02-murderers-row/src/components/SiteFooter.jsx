import { FaLinkedin } from 'react-icons/fa'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__social">
        <a
          href="https://www.linkedin.com/in/jonamichahammo"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer__social-link"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className="site-footer__design-credit">
        Design influenced by{' '}
        <a
          href="https://boxraw.com/blogs/blog/boxings-black-murderers-row-fighters"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer__credit-link"
        >
          BOXRAW
        </a>
      </p>
      <p className="site-footer__credit">
        Project by{' '}
        <a
          href="https://github.com/pythonidaer"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer__credit-link"
        >
          Pythonidaer
        </a>
        {' '}— in honor of historical and influential figures for Black History Month.
      </p>
    </footer>
  )
}
