import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" role="contentinfo">
            <div className="footer__inner">
                <div className="footer__text">
                    <span>DTS Website</span>
                    <span>© DTS</span>
                </div>
                <div className="footer__right">
                    © 2025 DTS-NewGRF<br />
                    본 사이트는 Next.js 이용하여 제작하였습니다.
                </div>
            </div>
        </footer>
    )
}

export default Footer;