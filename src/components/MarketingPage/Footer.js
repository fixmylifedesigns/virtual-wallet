import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-yellow-500 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/#features" className="text-zinc-400 hover:text-yellow-500">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-zinc-400 hover:text-yellow-500"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-yellow-500">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-yellow-500 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-zinc-400 hover:text-yellow-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-yellow-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-yellow-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8">
          <p className="text-base text-zinc-400">
            &copy; 2024 ThunderWallet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
