import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function SideBarPortal({ children }: Props) {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.querySelector('#sidebar') as Element;

  return createPortal(children, node);
}
