"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[56],{56:function(n,e,t){t.r(e),e.default="F0 := IMDB.File_actors;\nCountActors := RECORD\nF0.ActorName;\nUNSIGNED C := COUNT(GROUP);\nEND;\nMoviesIn := TABLE(F0,CountActors,ActorName);\nOUTPUT(TOPN(MoviesIn,100,-C));\n"}}]);
//# sourceMappingURL=56.27b389f4.chunk.js.map