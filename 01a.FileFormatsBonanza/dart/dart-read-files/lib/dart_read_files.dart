import 'dart:convert';
import 'dart:ffi';
import 'dart:io';
import 'dart:math';
import 'package:dart_read_files/client.dart';
import 'package:dart_read_files/timetracking.dart';
import 'package:dart_read_files/user.dart';

import 'package:xml2json/xml2json.dart';

import 'package:yaml/yaml.dart';
import 'package:csv/csv.dart';


void readFromJson(){
  var path = "../../../user.json";
  var jsonData = File(path).readAsStringSync();
  var user = User.fromJson(jsonData);
  print(user);
}

void readFromXml(){
  var path = "../../../user.xml";
  var xmlData = File(path).readAsStringSync();
  final xmlParser = Xml2Json();
  xmlParser.parse(xmlData);
  xmlParser.xmlParserResult;
  var jsonData = json.decode(xmlParser.toOpenRally());
  final root = jsonData['root'];
  var user = User(
    id: int.parse(root['id']),
    firstname: root['firstname'],
    lastname: root['lastname'],
    email: root['email'],
    );
  print(user);
}

void readFromYaml(){
  var path = "../../../user.yaml";
  var yamlData = File(path).readAsStringSync();
  var yaml = loadYaml(yamlData);
  var user = User(
    id: yaml['id'] as int,
    firstname: yaml['firstname'] as String,
    lastname: yaml['lastname'] as String,
    email: yaml['email'] as String,
    clients: (yaml['clients'] as YamlList).map((client) => Client.fromYaml(client as YamlMap)).toList(),
    timeTrackings: (yaml['timeTrackings'] as YamlList).map((timeTracking) => TimeTracking.fromYaml(timeTracking as YamlMap)).toList()
  );
  print(user);
}

void readFromCsv(){
  var path = "../../../user.csv";
  var jsonData = File(path).readAsStringSync();
  // var user = json.decode(jsonData);
  print(jsonData);
}

void readFromTxt(){
  var path = "../../../user.txt";
  var jsonData = File(path).readAsStringSync();
  var user = User.fromJson(jsonData);
  print(user);
}