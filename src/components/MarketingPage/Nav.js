import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-yellow-500"
            >
              ThunderWallet
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/#features"
              className="text-zinc-400 hover:text-yellow-500"
            >
              Features
            </Link>
            <Link
              href="/security"
              className="text-zinc-400 hover:text-yellow-500"
            >
              Security
            </Link>
            <Link
              href="#pricing"
              className="text-zinc-400 hover:text-yellow-500"
            >
              Pricing
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-400"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
