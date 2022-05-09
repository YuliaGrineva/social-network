import Registration from "./registration";

export default function Welcome() {
    return (
        <section>
            <h1>Welcome to my page!</h1>
            <img className="fish" src="/fish.png" />
            <img className="fish2" src="/fish.png" />
            <Registration />
        </section>
    );
}
