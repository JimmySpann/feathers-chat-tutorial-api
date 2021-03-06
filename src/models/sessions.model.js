module.exports = function (app) {
  const modelName = 'sessions';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    status: { type: String, required: true },
    users: [{
      id: {type: String},
      status: {type: String},
      score: {type: Number},
      isAlive: {type: Boolean},
    }]

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
