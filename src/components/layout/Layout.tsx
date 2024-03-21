import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Button, Divider, Menu } from 'react-daisyui';
import { AiFillProject, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsClipboardData } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { HiOutlineSupport } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TiTag } from 'react-icons/ti';

import Header from '@/components/layout/Header';

import { useSubstrate } from '@/context/substrate/SubstrateContextProvider';

export const navigation = [
  { name: 'Dashboard', href: '/', current: true, icon: <MdOutlineDashboard /> },
  {
    name: 'Projects',
    href: '/projects',
    current: false,
    icon: <AiFillProject />,
  },
  {
    name: 'Members',
    href: '/members',
    current: false,
    icon: <AiOutlineUsergroupDelete />,
  },
  { name: 'Tickets', href: '/tickets', current: false, icon: <FaTasks /> },
  { name: 'Board', href: '/board', current: false, icon: <BsClipboardData /> },
  { name: 'Sprint', href: '/sprint', current: false, icon: <TiTag /> },
  { name: 'Token', href: '/token', current: false, icon: <HiOutlineSupport /> },
  { name: 'Daos', href: '/daos', current: false, icon: <HiOutlineSupport /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useSubstrate();
  const router = useRouter();

  if (router.pathname === '/login')
    return (
      <div className='drawer-content flex-1'>
        <div className='container m-auto min-h-screen p-10 shadow-2xl'>
          {children}
        </div>
      </div>
    );

  return (
    <div className='drawer drawer-open flex flex-row-reverse justify-end'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex-1'>
        <Header />
        <div className='container m-auto min-h-screen p-10 shadow-2xl'>
          {children}
        </div>
        {/* <FooterComponent /> */}
      </div>
      <div className='drawer-side border-none'>
        {/* <label htmlFor='drawer' className='drawer-overlay'></label> */}

        <div className='bg-base-100  border-base-300 flex w-56 flex-col justify-start border-r p-2 shadow-xl'>
          <div className='mt-3'>
            <label
              htmlFor='drawer'
              className='drawer-button btn btn-ghost text-xl normal-case'
            >
              <RxHamburgerMenu className='mr-2' /> felidaeDAO
            </label>
          </div>
          <Divider />
          <Menu className='flex  flex-col'>
            {navigation.map((navItem) => (
              <Menu.Item
                className={
                  router.pathname === navItem.href ? 'bg-base-300' : ''
                }
                key={navItem.name}
              >
                <Link href={navItem.href}>
                  {navItem.icon}
                  {navItem.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <Button
            onClick={logout}
            color='error'
            startIcon={<BiLogOut />}
            className='mb-5 mt-auto'
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
