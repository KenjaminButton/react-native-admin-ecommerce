// Help for NextJS hydration errors

// 'use client';

// import React, { ReactNode, useEffect, useState } from 'react';

// export const RenderMounted = ({ children }: { children: ReactNode }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   if (!mounted) return null;

//   return <>{children}</>;
// };

'use client';

import React, { ReactNode, useEffect, useState } from 'react';

export const RenderMounted = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {mounted ? children : null}
    </div>
  );
};
