'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE EXTENSION pgcrypto;


      -- version 2 of tuid_generate is just random
      CREATE OR REPLACE FUNCTION tuid_generate()
        RETURNS UUID AS $$
      DECLARE
        ct  BIGINT;
        r   BYTEA;
        r0  BIGINT;
        r1  BIGINT;
        r2  BIGINT;
        ax  BIGINT;
        bx  BIGINT;
        cx  BIGINT;
        dx  BIGINT;
        ret VARCHAR;
      BEGIN
        r := gen_random_bytes(8); -- we use 58 bits of this

        r0 := (get_byte(r, 0) << 8) | get_byte(r, 1);
        r1 := (get_byte(r, 2) << 8) | get_byte(r, 3);

        -- The & mask here is to suppress the sign extension on the 32nd bit.
        r2 := ((get_byte(r, 4) << 24) | (get_byte(r, 5) << 16) | (get_byte(r, 6) << 8) | get_byte(r, 7)) & x'0FFFFFFFF'::BIGINT;

        ct := extract(EPOCH FROM clock_timestamp() AT TIME ZONE 'utc') * 1000000;

        ax := ct >> 32;
        bx := ct >> 16 & x'FFFF' :: INT;
        cx := x'4000' :: INT | ((ct >> 4) & x'0FFF' :: INT);
        dx := x'8000' :: INT | ((ct & x'F' :: INT) << 10) | (r0 >> 6);

        ret :=
          LPAD(TO_HEX(ax),8,'0') ||
          LPAD(TO_HEX(bx),4,'0') ||
          LPAD(TO_HEX(cx),4,'0') ||
          LPAD(TO_HEX(dx),4,'0') ||
          LPAD(TO_HEX(r1),4,'0') ||
          LPAD(TO_HEX(r2),8,'0');

        return ret :: UUID;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION tuid_old_generate()
        RETURNS UUID AS $$
      DECLARE
        ct  BIGINT;
        seq BIGINT;
        nid BIGINT;
        r0  BIGINT;
        r1  BIGINT;
        ax  BIGINT;
        bx  BIGINT;
        cx  BIGINT;
        dx  BIGINT;
        ex  BIGINT;
        fx  BIGINT;
        ret VARCHAR;
      BEGIN
        seq := 255;
        nid := 255;
        ct := extract(EPOCH FROM clock_timestamp() AT TIME ZONE 'utc') * 1000000;
        r0 := (random() * 4294967295 :: BIGINT) :: BIGINT;
        r1 := (random() * 4294967295 :: BIGINT) :: BIGINT;

        ax := ct >> 32;
        bx := ct >> 16 & x'FFFF' :: INT;
        cx := x'4000' :: INT | ((ct >> 4) & x'0FFF' :: INT);
        dx := x'8000' :: INT | ((ct & x'F' :: INT) << 10) | (seq << 2) | (nid >> 6);
        ex := ((nid & x'3F' :: INT) << 2) | (r0 & x'3FF' :: INT);
        fx := r1;

        ret :=
          LPAD(TO_HEX(ax),8,'0') ||
          LPAD(TO_HEX(bx),4,'0') ||
          LPAD(TO_HEX(cx),4,'0') ||
          LPAD(TO_HEX(dx),4,'0') ||
          LPAD(TO_HEX(ex),4,'0') ||
          LPAD(TO_HEX(fx),8,'0');

        return ret :: UUID;
      END;
      $$ LANGUAGE plpgsql;

      -- all random version
      CREATE OR REPLACE FUNCTION tuid_ar_generate()
        RETURNS UUID AS $$
      DECLARE
        ct  BIGINT;
        seq BIGINT;
        nid BIGINT;
        r0  BIGINT;
        r1  BIGINT;
        r2  BIGINT;
        ax  BIGINT;
        bx  BIGINT;
        cx  BIGINT;
        dx  BIGINT;
        ex  BIGINT;
        fx  BIGINT;
        ret VARCHAR;
      BEGIN
        r2 := (random() * 4294967295 :: BIGINT) :: BIGINT;
        seq := r2 & x'FF' :: INT;
        nid := (r2 >> 8) & x'FF' :: INT;
        ct := extract(EPOCH FROM clock_timestamp() AT TIME ZONE 'utc') * 1000000;
        r0 := (random() * 4294967295 :: BIGINT) :: BIGINT;
        r1 := (random() * 4294967295 :: BIGINT) :: BIGINT;

        ax := ct >> 32;
        bx := ct >> 16 & x'FFFF' :: INT;
        cx := x'4000' :: INT | ((ct >> 4) & x'0FFF' :: INT);
        dx := x'8000' :: INT | ((ct & x'F' :: INT) << 10) | (seq << 2) | (nid >> 6);
        ex := ((nid & x'3F' :: INT) << 2) | (r0 & x'3FF' :: INT);
        fx := r1;

        ret :=
          LPAD(TO_HEX(ax),8,'0') ||
          LPAD(TO_HEX(bx),4,'0') ||
          LPAD(TO_HEX(cx),4,'0') ||
          LPAD(TO_HEX(dx),4,'0') ||
          LPAD(TO_HEX(ex),4,'0') ||
          LPAD(TO_HEX(fx),8,'0');

        return ret :: UUID;
      END;
      $$ LANGUAGE plpgsql;  
  `)
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.sequelize.query(`
      drop extension pgcrypto;
      drop function tuid_generate;
    `)
  }
};
