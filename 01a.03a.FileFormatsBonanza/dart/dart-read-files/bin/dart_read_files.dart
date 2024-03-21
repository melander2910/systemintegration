import 'dart:convert';
import 'package:dart_read_files/dart_read_files.dart';
import 'package:dart_read_files/user.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:http/http.dart' as http;

void main() async {
  var handler = Pipeline().addMiddleware(logRequests()).addHandler(_echoRequest);
  var server = await shelf_io.serve(handler, 'localhost', 5050);
  print('Serving at http://${server.address.host}:${server.port}');
}

Future<Response> _echoRequest(Request request) async {
  final contentType = {'Content-Type': 'application/json'};
  var jsonFilePath = "../../user.json";
  var xmlFilePath = "../../user.xml";
  var yamlFilePath = "../../user.yaml";
  var csvFilePath = "../../user.csv";
  var txtFilePath = "../../user.txt";
  print(request.url.path);
  switch (request.url.path) {
    case '':
      return Response.ok("Welcome");

    case 'json':
      // final userFromJson = readFromJson(jsonFilePath);
      final response = await http.get(Uri.parse('http://localhost:3000/json'));
      return Response.ok(response.body, headers: contentType);

    case 'xml':
      final userFromXml = readFromYaml(xmlFilePath);
      return Response.ok(userFromXml.toJson(), headers: contentType);

    case 'yaml':
      final userFromYaml = readFromYaml(yamlFilePath);
      return Response.ok(userFromYaml.toJson(), headers: contentType);

    case 'csv':
      final usersFromCsv = readFromCsv(csvFilePath);
      return Response.ok(usersFromCsv, headers: contentType);

    case 'txt':
      final usersFromTxt = readFromTxt(txtFilePath);
      return Response.ok(usersFromTxt.toJson(), headers: contentType);

    default:
      return Response.notFound('Requested Url Not Found');
  }
}

