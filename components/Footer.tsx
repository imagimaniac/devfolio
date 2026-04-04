import { personalInfo } from '@/data';

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-10 relative">
      <div className="relative w-full h-full">
        <div className="relative z-10">
          <div className="text-center my-10">
            <p className="mx-auto pt-5 sm:text-3xl mb-4">
              ✷ Link to the  <a
                href={`https://github.com/${personalInfo.github}/devfolio`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-electricBlue-light to-circuitGreen bg-clip-text text-transparent font-extrabold hover:scale-105 inline-block transition-transform duration-200"
              >
                github
              </a> repository ✷
            </p>
            <iframe
              src={`https://ghbtns.com/github-btn.html?user=${personalInfo.github}&repo=devfolio&type=star&count=true&size=large`}
              frameBorder="0"
              scrolling="0"
              width="150"
              height="30"
              title="Star on GitHub"
            />
          </div>
          <div className="text-center">
            <p className="md:text-base text-sm md:font-normal font-light mt-5 opacity-60">
              Crafted with ❤ by  <a
                className="bg-gradient-to-r from-electricBlue-light via-electricBlue to-circuitGreen bg-clip-text text-transparent font-extrabold hover:scale-105 inline-block transition-transform duration-200"
                target="_blank"
                href={`https://github.com/${personalInfo.github}`}
              >
                Pratik Gajanan.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
