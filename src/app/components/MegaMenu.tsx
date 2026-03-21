import React, { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import * as HoverCard from '@radix-ui/react-hover-card';

interface MegaMenuLink {
  label: string;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

interface MegaMenuProps {
  trigger: string;
  columns: MegaMenuColumn[];
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ trigger, columns }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard.Root open={isOpen} onOpenChange={setIsOpen} openDelay={0} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <button
          className="flex items-center gap-1 text-sm font-medium hover:text-gray-600 transition-colors uppercase tracking-wide"
          onMouseEnter={() => setIsOpen(true)}
        >
          {trigger} <ChevronDown className="h-4 w-4" />
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="bg-white border border-gray-200 shadow-lg rounded-none w-screen max-w-4xl mt-2 z-50"
          sideOffset={5}
          align="center"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid gap-8 p-8" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-sm mb-4 uppercase tracking-wider">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-600 hover:text-black transition-colors block uppercase tracking-wide"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
