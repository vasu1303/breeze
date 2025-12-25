import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import Logo from '../ui/Logo';
import RightSection from '../sections/RighSection';
import LeftSection from '../sections/LeftSection';

type Props = {
  status: string;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
};

export const ActiveView: React.FC<Props> = ({ status, transcript, onStart, onStop }) => {
  const isRecording = status === "Listening...";

  return (
    <main>
      <div className='flex'>
          <LeftSection/>
          <RightSection />
      </div>
    </main>
  );
};