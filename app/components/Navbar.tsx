import Image from "next/image";
import { navLinks } from "../constants";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Image src="/logo.svg" alt="Apple Logo" width={30} height={30} />

        <ul>
          {navLinks.map(({ label }) => (
            <li key={label}>
              <a href={`#${label}`}> {label} </a>
            </li>
          ))}
        </ul>
        <div className="flex-center gap-3">
          <button>
            <Image src="/search.svg" alt="search" width={30} height={30} />
          </button>
          <button>
            <Image src="/cart.svg" alt="cart" width={30} height={30} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
