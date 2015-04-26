module.export = {

  camelize: function(str) {
    return str.replace (/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? c.toUpperCase () : '';
    });
  }
};
