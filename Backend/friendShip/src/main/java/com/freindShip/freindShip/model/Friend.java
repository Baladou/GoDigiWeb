package com.freindShip.freindShip.model;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@JsonSerialize
@JsonDeserialize
@Document

@CompoundIndex(name = "friend", def = "{'fromUser' : 1, 'toUser': -1}",unique = true)
public class Friend {
    @Id
    private String id;
    @Field(name ="fromUser" )
    //@Indexed(name = "fromUser",unique = true)
    private String fromUser;
    @Field(name = "toUser")
    //@Indexed(name = "toUser",unique = true)
    private String toUser;

    private  int status;//0=requested   , 1=accepted, 2=canceled, 3=blocked;


    public Friend(String id, String fromUser, String toUser, int status) {
        this.id = id;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFromUser() {
        return fromUser;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public String getToUser() {
        return toUser;
    }

    public void setToUser(String toUser) {
        this.toUser = toUser;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Friend{" +
                "fromUser='" + fromUser + '\'' +
                ", toUser='" + toUser + '\'' +
                ", status=" + status +
                '}';
    }
}
