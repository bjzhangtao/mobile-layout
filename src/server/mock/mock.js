import Mock from 'mockjs';

Mock.mock(RegExp('/api/afsAreaInfo/getAreaNext' + '.*'), 'get', {
  "status": 200,
  "message": "success",
  "data": {
    "code": 1,
    "msg": null,
    "data": [{"code": 604110849, "name": "Chanuman", "postCode": 37210}, {
      "code": 604110851,
      "name": "Kham Khuean Kaeo",
      "postCode": 37210
    }, {"code": 604110850, "name": "Khok  San", "postCode": 37210}, {
      "code": 604110852,
      "name": "Khok Kong",
      "postCode": 37210
    }, {"code": 604110853, "name": "Pa Ko", "postCode": 37210}]
  },
  "returnUrl": null
});
