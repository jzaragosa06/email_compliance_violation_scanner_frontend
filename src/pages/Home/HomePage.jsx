import Footer from "../../components/Footer";
import NavBar from "./NavBar";
import About from "./About";
import Hero from "./Hero";
import Service from "./Service";


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                <Hero />
                <Service />
                <About />
            </main>
            <Footer />
        </div>


    )
}

