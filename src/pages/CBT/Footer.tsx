import submitImg from './submit.png';
import submitDisImg from './submit-disabled.png';


const Footer = () => {

  const allowSubmit = false;
  return (
    <div className="w-full h-[90px] border-t px-5 sm:px-10 flex shrink-0 justify-end items-center relative">
      <button disabled={!allowSubmit}>
        <img src={allowSubmit ? submitImg : submitDisImg} alt="" className="w-[11rem]" />
      </button>
    </div>
  );
};

export default Footer;