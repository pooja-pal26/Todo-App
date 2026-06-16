import React from 'react'
import TodoForm from '../Components/TodoForm'

export default function HomePage() {
    return (
        <>
            <div className="container">
                <div className="card border-secondary shadow-sm">
                    <div className="card-header bg-secondary text-white text-center">
                        <h4>My Todo App</h4>
                    </div>
                    <div className="card-body bg-light">
                        <p className="text-muted text-center"></p>
                    </div>
                </div>
            </div>

            <TodoForm />
        </>
    )
}
