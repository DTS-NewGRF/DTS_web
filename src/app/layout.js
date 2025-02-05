import "@/assets/scss/style.scss"

export const metadata = {
  title: "DTS-NewGrf 사이트 만들기",
  description: "DTS-Newgrf의 자료 공개 공간입니다.",
  keywords: ["넥스트", "next.js", "DTS", "OpenTTD", "Newgrf"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      <body>
        {children}
      </body>
    </html>
  );
}
