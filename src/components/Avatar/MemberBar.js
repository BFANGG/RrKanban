import React from "react";

//显示成员头像的一个bar
export default function MemberBar(props) {
    const members = props.members;
    return (
        <span className="memberbar">
                {members && members.map((member, index) => (
                    <div className="member-avatar">
                        <img src={member.avatar}></img>
                    </div>
                ))}
        </span>
    )
}