import yoga from '../../assets/yoga.svg';
import swim from '../../assets/swim.svg';
import bike from '../../assets/bike.svg';
import lift from '../../assets/lift.svg';

const Sidebar = () => {
  return (
    <div className="absolute top-0 -z-10 flex flex-col justify-between items-center h-full pb-16 px-8 bg-[#020203]">
      <span></span>
      <ul className="flex flex-col gap-8 pt-32">
        <li>
          <a href="/">
            <img src={yoga} />
          </a>
        </li>
        <li>
          <a href="">
            <img src={swim} />
          </a>
        </li>
        <li>
          <a href="">
            <img src={bike} />
          </a>
        </li>
        <li>
          <a href="">
            <img src={lift} />
          </a>
        </li>
      </ul>
      <span className="copyright text-[12px] text-white rotate-180">Copiryght, SportSee 2020</span>
    </div>
  );
}

export default Sidebar;
