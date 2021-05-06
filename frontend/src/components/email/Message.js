import React, { useState } from "react";
import form from "react-bootstrap";
const Message = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const PostData = () => {
        fetch("/student/send", {
            method: "post",
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Message sent");
                setMessage("");
                setName("");
                setSubject("");
                setEmail("");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        /*
<div style={{maxWidth: '60%', display:'flex', flexDirection: 'column', alignItems:'center'}} className="mycard">
<div className="card auth-card input-field">

<input
type="text"
placeholder="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<input
type="text"
placeholder="name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<input
type="text"
placeholder="subject"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
/>
<textarea
type="text"
placeholder="Message"
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>
<button className="btn waves-effect waves-light #64b5f6 blue darken-1"
onClick={()=>PostData()}
>
Send Message
</button>
</div>
</div>*/
        <div className="pt-5">
            <div className="card col-md-8 mx-auto mt-4">
                <div className="card-body">
                    <div className="card-title">
                        <h4>Send a message to Admin</h4>
                    </div>
                    <form>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">
                                Message
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                type="text"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => PostData()}
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Message;
