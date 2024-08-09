import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="w-full text-white bg-[#020203] p-8 pr-64 shadow-lg">
      <nav>
        <ul className="flex justify-between items-center text-[24px]">
          <li>
            <a href="/">
              <img className="h-16" src={logo} alt="logo" />
            </a>
          </li>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/*">Profil</a>
          </li>
          <li>
            <a href="/*">Réglages</a>
          </li>
          <li>
            <a href="/*">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
