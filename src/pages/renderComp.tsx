import {useState, useEffect, FC} from 'react'
import MobileComponent from '../components/Lesson/MobileComponent';
import DesktopComponent from '../components/Lesson/DesktopComponent';

interface ComponentSlides {
  slides : any[]
  back : Function;
  title? : string;
}
// Will make typed later
//lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];

const RenderComponent : FC<ComponentSlides> = ({slides, back, title}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Event listener function to update the screen width state
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const breakpoint = 930;


  return (
    <div className='h-full'>
      {screenWidth < breakpoint ? (
        <MobileComponent slides={slides} back={back} title={title}/>
      ) : (
        <DesktopComponent slides={slides} back={back} title={title}/>
      )}
    </div>
  );
}

export default RenderComponent