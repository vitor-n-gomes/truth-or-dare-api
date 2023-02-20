import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name');
      table.string('email').unique();
      table.string('password');
      table.boolean('status').defaultTo(true);
      table.boolean('force_password_reset').defaultTo(false);
      table.string('reset_password_token', 255).nullable().defaultTo(null); 
      table.string('remember_me_token', 255).nullable().defaultTo(null); 

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
