import PropTypes from "prop-types"
import { decode } from "he"

export default function Quiz(props) {
    return (
        <div>
            {props.data.map((q, i) => (
                <p key={i}>{decode(q.question)}</p>
            ))}
        </div>
    )
}

Quiz.propTypes = {
    data: PropTypes.array.isRequired
}