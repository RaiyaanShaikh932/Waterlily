import {CollectionProvider} from '../components/collection-context';
import Header from '../components/header';
import Footer from '../components/footer';
import Hero from '../components/hero';
import Philosophy from '../components/philosophy';
import Collections from '../components/collections';
import Craft from '../components/craft';
import Manifesto from '../components/manifesto';
import Visit from '../components/visit';
export default function Home(){return <CollectionProvider><div className="hero-wrapper"><Header/><Hero/></div><main id="main"><Philosophy/><Collections/><Craft/><Manifesto/><Visit/></main><Footer/></CollectionProvider>;}
