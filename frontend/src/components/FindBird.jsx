import { useState } from "react";
import Dropzone from "./Dropzone";
import Navbar from "./Navbar";

async function validateBird(birdUrl) {
    try {
        const response = await fetch('http://localhost:3000/validate/', {
            method: 'POST',
            body: JSON.stringify({
                birdLink: birdUrl
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error: ' + err);
        return null;
    }
}

const FindBird = () => {
    const [bird, setBird] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const onValidateClick = async () => {
        try {
            const response = await validateBird(bird);
            setResult(response);
        } catch (err) {
            setError(err);
        }
    }

    const onInputChange = (event) => {
        setBird(event.target.value);
    }

    return (
        <>
            <Navbar />
            <div>
                <Dropzone className="dropzone" />
                <label htmlFor="url-input">Input Url</label>
                <input
                    placeholder="Enter URL"
                    value={bird}
                    onChange={onInputChange}
                    id="url-input"
                />
                <button type="button" onClick={onValidateClick} className="btn btn-primary">Validate & Predict</button>

                {error && <p>Error: {error.message}</p>}
                {result && <p>Validation Result: {JSON.stringify(result)}</p>}
            </div>
        </>
    );
}

export default FindBird;
