import Container from '../componenets/Container/Container';
import HomeSection1 from './HomeSection1';
import HomeSection2 from './HomeSection2';
import HomeSection3 from './HomeSection3';
import HomeSection4 from './HomeSection4';
import { useOutletContext } from 'react-router-dom';

function HomeMain() {
    const {selectedTheme, setSelectedTheme} = useOutletContext();

    return (
        <div className="w-full sm:px-5 md:px-10 md:mt-4 sm:mt-0 text-center">
            <Container>
                <HomeSection1 selectedTheme={selectedTheme} />
                <HomeSection2 setSelectedTheme={setSelectedTheme} selectedTheme={selectedTheme} />
                <HomeSection3/>
                <HomeSection4/>
            </Container>
        </div>
    );
}

export default HomeMain;
