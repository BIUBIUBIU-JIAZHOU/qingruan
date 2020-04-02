package com.yl.smarthome.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yl.smarthome.bean.OpenidJson;
import com.yl.smarthome.util.HttpUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
@RestController
public class GetOpenidController {
    private String appID = "wxb1ab9181f61b360b";
    private String appSecret = "6fa954bc348faba6702830dfb6980afd";

    @PostMapping("/login")
    public String userLogin(@RequestParam("code") String code) throws IOException {
        String result = "";
        try{//请求微信服务器，用code换取openid。HttpUtil是工具类，后面会给出实现，Configure类是小程序配置信息，后面会给出代码
            result = HttpUtil.doGet(
                    "https://api.weixin.qq.com/sns/jscode2session?appid="
                            + this.appID + "&secret="
                            + this.appSecret + "&js_code="
                            + code
                            + "&grant_type=authorization_code", null);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        ObjectMapper mapper = new ObjectMapper();
        OpenidJson openIdJson = mapper.readValue(result,OpenidJson.class);
        System.out.println(result.toString());
        System.out.println(openIdJson.getOpenid());
        return result;
    }
}
