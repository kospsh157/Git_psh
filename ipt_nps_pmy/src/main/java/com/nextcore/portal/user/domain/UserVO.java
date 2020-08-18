package com.nextcore.portal.user.domain;

import org.apache.ibatis.type.Alias;

/**
 * @author phd
 * @project portal
 * @date 2019-06-14
 * @time 오후 4:09
 */
@Alias( "User" )
public class UserVO
{
    private String userId;
    private String userPw;
    private String userNm;
    private String team;
    private String degree;
    private String vqms;
    
    
    
    
    public String getVqms() {
		return vqms;
	}

	public void setVqms(String vqms) {
		this.vqms = vqms;
	}

	public String getUserId()
    {
        return userId;
    }

    public void setUserId( String userId )
    {
        this.userId = userId;
    }

    public String getUserPw()
    {
        return userPw;
    }

    public void setUserPw( String userPw )
    {
        this.userPw = userPw;
    }

    public String getUserNm()
    {
        return userNm;
    }

    public void setUserNm( String userNm )
    {
        this.userNm = userNm;
    }

    public String getTeam()
    {
        return team;
    }

    public void setTeam( String team )
    {
        this.team = team;
    }

    public String getDegree()
    {
        return degree;
    }

    public void setDegree( String degree )
    {
        this.degree = degree;
    }


    @Override
	public String toString() {
		return "UserVO [userId=" + userId + ", userPw=" + userPw + ", userNm=" + userNm + ", team=" + team + ", degree="
				+ degree + "]";
	}
}
