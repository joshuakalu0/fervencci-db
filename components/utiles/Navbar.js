import Image from "next/image";
import Backend from "./header/Backend";
import Link from "next/link";
export default function Navbar({ type }) {
  return (
    <nav className='nav-font flex sticky top-0 shadow-md z-10 nav-color p-2'>
      {/* section one - logo */}
      <div className='flex items-center justify-between space-x-auto w-full'>
        <div className='flex items-center justify-between flex-grow'>
          <Link href='/'>
            <Image src='/client-2.png' alt='logo' width={50} height={28} />
          </Link>
        </div>
        <Backend />
      </div>
    </nav>
  );
}
