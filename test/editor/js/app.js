(function($) {

  var dummyContent = "### テスト記事です。" + "\n"
                   + "\n"
                   + "みなさんこんにちは。  "+ "\n" +"いかがお過ごしでしょうか。" + "\n"
                   + "\n"
                   + "これはテスト記事なので注意してください。  " + "\n"
                   + "特に意味はありません。" + "\n"
                   + "\n"
                   + "リンクのテストを行います。" + "\n"
                   + "\n"
                   + "[link](https://github.com/vuejs/vue)" + "\n"
                   + "\n"
                   + "画像のテストを行います。" + "\n"
                   + "\n"
                   + "![kokushin](https://pbs.twimg.com/profile_images/769019872198139904/6NdduSfA.jpg)" + "\n"
                   + "\n"
                   + "素晴らしい！";

  var md = new Vue({
    el: '#content',
    data: {
      input: dummyContent
    },
    computed: {
      compiledMarkdown: function () {
        var renderer = new marked.Renderer();

        renderer.heading = function (text, level) {
          return '<h' + level + '>' + text + '</h' + level + '>';
        };

        return marked(this.input, {
          renderer: renderer,
          sanitize: true
        });
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  });

  var outputJson = new Vue({
    el: '#export',
    methods: {
      getTextSrc: function () {
        var title = $('#title-input').val();
        var filename = $('#filename-input').val();
        var tags = $('#tags-input').val();
        var content = $('#content-output').html();
        var summary = ($('#content-output').text().replace("\n", "")).slice(0, 50) + ' ...';
        var d = new Date();
        var days = ['日','月','火','水','木','金','土'];
        var date = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          date: d.getDate(),
          day: days[d.getDay()],
          hours: d.getHours(),
          minutes: d.getMinutes(),
          seconds: d.getSeconds()
        };
        this.generateJson(title, filename, tags, content, summary, date);
      },
      generateJson: function(title, filename, tags, content, summary, date) {
        var json = JSON.stringify({
          id: filename,
          date: date.year +'/'+ date.month +'/'+ date.date,
          tags: tags,
          title: title,
          content: content,
          summary: summary
        }, null, "\t") + ',';

        $('#modal').show().find('code').text(json);
      }
    }
  });

  var closeModal = new Vue({
    el: '#close',
    methods: {
      closeModal: function(e) {
        e.preventDefault();

        $('#modal').hide();
      }
    }
  });

  // copy to clipboard
  var clipboard = new Clipboard('#copy button');
      clipboard.on('success', function(e) {
          alert('クリップボードにコピーしました。');
      });

})(jQuery);