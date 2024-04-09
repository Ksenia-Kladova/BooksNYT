import { useAppSelector } from "../../../hooks/redux-hook";

export function History() {
    const { history } = useAppSelector(state => state.search);

    return (
        <div>
            <h1>History</h1>
            <ul>
                {history.map(item =>
                    <li key={item} >{
                        item
                    }</li>
                )}
            </ul>
        </div>
    )
}