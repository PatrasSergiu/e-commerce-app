import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';

const Navbar = async () => {

    const { userId } = await auth();

    if(!userId)  {
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        },
    })

    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <StoreSwitcher items={stores}></StoreSwitcher>
                <MainNav className='mx-5'/>
                <div className='ml-auto flex items-center space-x-4'>
                    <UserButton afterSignOutUrl='/'></UserButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;