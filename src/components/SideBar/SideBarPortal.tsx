import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function SideBarPortal({ children }: Props) {
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => setNode(document.querySelector('#sidebar')), []);

  if (!node) return <></>;

  return createPortal(children, node);
}
