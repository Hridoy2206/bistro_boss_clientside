import Banner from "./Banner";
import BistoInfo from "./BistroInfo";
import Call from "./Call";
import Category from "./Category";
import Featured from "./Featured";
import PopularItem from "./PopularItem";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <BistoInfo />
            <Call />
            <Featured />
            <PopularItem />
            <Testimonials />
        </div>
    );
};

export default Home;