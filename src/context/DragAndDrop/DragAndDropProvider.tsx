'use client';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

type Props = {
  children: React.ReactNode;
};

export default function DragAndDropProvider({ children }: Props) {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>;
}
