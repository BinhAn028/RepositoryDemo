import './global.css';

export const metadata = {
  title: 'NextGram',
  description:
    'A sample Next.js app showing dynamic routing with modals as a route.',
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {props.children}
        {props.modal}
        {props.sidebar}
        <div id="modal-root" />
      </body>
    </html>
  );
}
